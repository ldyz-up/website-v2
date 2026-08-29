<?php
/**
 * LongDe Yizhi 官网 · 询价表单收件脚本（纯 PHP，无需安装任何第三方库）
 *
 * 功能：
 *   1. 接收前端表单 POST 提交的询价内容；
 *   2. 把内容通过 SMTP（企业邮箱）发送到您的收件邮箱；
 *   3. 同时在服务器上保存一份备份（inquiries/inquiries.csv），防止邮件丢失。
 *
 * 上线前请在下方「配置区」填写：企微邮箱的 SMTP 客户端授权密码。
 * 配置完成后，打开 test_mail.php 发送测试邮件验证是否成功。
 */

error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);
ini_set('display_errors', '0');
date_default_timezone_set('Asia/Shanghai');

/* ==================== 配置区（上线前请修改） ==================== */
$CONFIG = array(
    // 收件邮箱：客户询盘发送给谁（建议用企微邮箱，客户留言直接进企业微信邮箱）
    'to_email'    => 'sales@longdeyizhi.com',
    'to_name'     => 'LongDe Yizhi Sales',

    // 发件邮箱：和企微邮箱一致（如 sales@longdeyizhi.com）
    'from_email'  => 'sales@longdeyizhi.com',
    'from_name'   => 'LongDe Yizhi Website',

    // SMTP 服务器：企业微信邮箱（腾讯企业邮箱）
    'smtp_host'   => 'smtp.exmail.qq.com',
    'smtp_port'   => 465,                 // 465=SSL
    'smtp_secure' => 'ssl',               // ssl
    'smtp_user'   => 'sales@longdeyizhi.com',          // SMTP 登录账号（企微邮箱地址）
    'smtp_pass'   => '请填写企微邮箱的客户端授权密码',  // ★ 客户端授权密码，不是登录密码
);
/* ============================================================== */

/* ---------- 极简 SMTP 发送类（无需任何第三方库） ---------- */
class SimpleSmtp
{
    private $host;
    private $port;
    private $secure;
    private $user;
    private $pass;
    public $lastError = '';

    public function __construct($host, $port, $secure, $user, $pass)
    {
        $this->host = $host;
        $this->port = (int)$port;
        $this->secure = $secure;
        $this->user = $user;
        $this->pass = $pass;
    }

    public function send($from, $fromName, $to, $toName, $subject, $body)
    {
        $prefix = ($this->secure === 'tls') ? 'tcp://' : 'ssl://';
        $conn = @stream_socket_client($prefix . $this->host . ':' . $this->port, $errno, $errstr, 20);
        if (!$conn) {
            $this->lastError = '无法连接 SMTP 服务器：' . $errstr;
            return false;
        }
        stream_set_timeout($conn, 20);

        if (!$this->expect($conn, '220')) {
            fclose($conn);
            return false;
        }

        if ($this->secure === 'tls') {
            $this->cmd($conn, 'EHLO ' . $this->heloName());
            if (!$this->expect($conn, '250')) { fclose($conn); return false; }
            $this->cmd($conn, 'STARTTLS');
            if (!$this->expect($conn, '220')) { fclose($conn); return false; }
            if (!stream_socket_enable_crypto($conn, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                $this->lastError = 'TLS 加密失败';
                fclose($conn);
                return false;
            }
        }

        $this->cmd($conn, 'EHLO ' . $this->heloName());
        if (!$this->expect($conn, '250')) { fclose($conn); return false; }

        $this->cmd($conn, 'AUTH LOGIN');
        if (!$this->expect($conn, '334')) { fclose($conn); return false; }
        $this->cmd($conn, base64_encode($this->user));
        if (!$this->expect($conn, '334')) { fclose($conn); return false; }
        $this->cmd($conn, base64_encode($this->pass));
        if (!$this->expect($conn, '235')) { fclose($conn); return false; }

        $this->cmd($conn, 'MAIL FROM: <' . $from . '>');
        if (!$this->expect($conn, '250')) { fclose($conn); return false; }
        $this->cmd($conn, 'RCPT TO: <' . $to . '>');
        if (!$this->expect($conn, '250')) { fclose($conn); return false; }

        $this->cmd($conn, 'DATA');
        if (!$this->expect($conn, '354')) { fclose($conn); return false; }

        $headers  = 'From: ' . $this->mimeHeader($fromName) . ' <' . $from . '>' . "\r\n";
        $headers .= 'To: ' . $this->mimeHeader($toName) . ' <' . $to . '>' . "\r\n";
        $headers .= 'Subject: ' . $this->mimeHeader($subject) . "\r\n";
        $headers .= 'Date: ' . date('r') . "\r\n";
        $headers .= 'Message-ID: <' . md5(uniqid('', true)) . '@' . $this->host . ">\r\n";
        $headers .= 'X-Mailer: LongDeYizhi-Website' . "\r\n";
        $headers .= 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-Type: text/html; charset=UTF-8' . "\r\n";
        $headers .= 'Content-Transfer-Encoding: 8bit' . "\r\n";

        $body = str_replace("\r\n", "\n", $body);
        $body = str_replace("\n", "\r\n", $body);
        $body = preg_replace('/^\./m', '..', $body);

        fwrite($conn, $headers . "\r\n" . $body . "\r\n.\r\n");
        if (!$this->expect($conn, '250')) { fclose($conn); return false; }

        $this->cmd($conn, 'QUIT');
        fclose($conn);
        return true;
    }

    private function heloName()
    {
        return isset($_SERVER['SERVER_NAME']) && $_SERVER['SERVER_NAME'] !== ''
            ? preg_replace('/[^A-Za-z0-9.\-]/', '', $_SERVER['SERVER_NAME'])
            : 'localhost';
    }

    private function cmd($conn, $line)
    {
        fwrite($conn, $line . "\r\n");
    }

    private function expect($conn, $code)
    {
        $this->lastError = '';
        while (true) {
            $line = fgets($conn, 1024);
            if ($line === false) {
                $this->lastError = '连接中断';
                return false;
            }
            $line = trim($line);
            if (strlen($line) < 3) continue;
            if (substr($line, 0, 3) === $code) {
                if (isset($line[3]) && $line[3] === ' ') return true;
                // 否则是多行应答（如 250-），继续读取
            } else {
                $this->lastError = 'SMTP 异常响应：' . $line;
                return false;
            }
        }
    }

    private function mimeHeader($str)
    {
        $str = trim($str);
        if (preg_match('/[\x80-\xff]/', $str)) {
            return '=?UTF-8?B?' . base64_encode($str) . '?=';
        }
        return $str;
    }
}

/* ---------- 截断辅助（避免 mbstring 未开启时报错） ---------- */
function cut_str($s, $max)
{
    $s = (string)$s;
    if (function_exists('mb_substr')) {
        return mb_substr($s, 0, $max, 'UTF-8');
    }
    return substr($s, 0, $max);
}

/* ---------- 保存询盘备份到 CSV（放在网站目录之外，更安全） ---------- */
function save_inquiry_csv($data)
{
    $dir = dirname(__DIR__) . '/inquiries';
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
    $file = $dir . '/inquiries.csv';
    $isNew = !file_exists($file);
    $fp = @fopen($file, 'a');
    if (!$fp) {
        return false;
    }
    if ($isNew) {
        fputcsv($fp, array('时间', 'IP', '姓名', '公司', '邮箱', '电话', '微信', '其他联系方式', '产品分类', '产品', '数量', '留言', '邮件是否发送成功'));
    }
    fputcsv($fp, $data);
    fclose($fp);
    return true;
}

/* ---------- 处理询价表单提交 ---------- */
function handle_inquiry()
{
    global $CONFIG;

    header('Content-Type: application/json; charset=utf-8');

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        echo json_encode(array('ok' => false, 'msg' => 'method not allowed'));
        exit;
    }

    // 蜜罐反垃圾：这个隐藏字段正常人不会填，填了就当作垃圾直接丢弃
    if (!empty($_POST['website'])) {
        echo json_encode(array('ok' => true, 'email_sent' => false, 'msg' => 'ok'));
        exit;
    }

    $name     = isset($_POST['name']) ? cut_str(trim($_POST['name']), 100) : '';
    $company  = isset($_POST['company']) ? cut_str(trim($_POST['company']), 100) : '';
    $email    = isset($_POST['email']) ? cut_str(trim($_POST['email']), 150) : '';
    $phone    = isset($_POST['phone']) ? cut_str(trim($_POST['phone']), 50) : '';
    $wechat   = isset($_POST['wechat']) ? cut_str(trim($_POST['wechat']), 100) : '';
    $contactApp = isset($_POST['contact_app']) ? cut_str(trim($_POST['contact_app']), 100) : '';
    $category = isset($_POST['category']) ? cut_str(trim($_POST['category']), 100) : '';
    $product  = isset($_POST['product']) ? cut_str(trim($_POST['product']), 150) : '';
    $qty      = isset($_POST['quantity']) ? cut_str(trim($_POST['quantity']), 50) : '';
    $msg      = isset($_POST['message']) ? cut_str(trim($_POST['message']), 5000) : '';
    $lang     = isset($_POST['lang']) ? cut_str(trim($_POST['lang']), 10) : '';

    if ($name === '' || $company === '' || $email === '') {
        echo json_encode(array('ok' => false, 'msg' => 'missing required fields'));
        exit;
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(array('ok' => false, 'msg' => 'invalid email'));
        exit;
    }

    $subject = '【官网询盘】' . ($company !== '' ? $company : $name)
             . ($product !== '' ? ' - ' . $product : '');

    $esc = function ($v) {
        return htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8');
    };
    $rows = array(
        array('姓名', $name),
        array('公司', $company),
        array('邮箱', $email),
        array('电话', $phone !== '' ? $phone : '-'),
        array('微信', $wechat !== '' ? $wechat : '-'),
        array('其他联系方式', $contactApp !== '' ? $contactApp : '-'),
        array('产品分类', $category !== '' ? $category : '-'),
        array('产品', $product !== '' ? $product : '-'),
        array('数量', $qty !== '' ? $qty : '-'),
        array('语言', $lang !== '' ? $lang : '-'),
        array('留言内容', $msg !== '' ? $msg : '-'),
        array('来源页面', isset($_SERVER['HTTP_REFERER']) && $_SERVER['HTTP_REFERER'] !== '' ? $_SERVER['HTTP_REFERER'] : '-'),
        array('提交时间', date('Y-m-d H:i:s')),
        array('客户IP', isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '-'),
    );

    $body  = '<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#16324F;">';
    $body .= '<h2 style="color:#16324F;margin:0 0 14px;">收到新的询价请求</h2>';
    $body .= '<table border="0" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:680px;">';
    foreach ($rows as $r) {
        $body .= '<tr>'
               . '<td style="border:1px solid #ddd;background:#F7F6EF;font-weight:bold;width:130px;">' . $esc($r[0]) . '</td>'
               . '<td style="border:1px solid #ddd;word-break:break-all;">' . $esc($r[1]) . '</td>'
               . '</tr>';
    }
    $body .= '</table>';
    $body .= '<p style="color:#8a8f96;font-size:12px;margin-top:14px;">本邮件由 LongDe Yizhi 官网自动发送，客户询盘同时已备份在服务器 inquiries/inquiries.csv。</p>';
    $body .= '</div>';

    $smtp = new SimpleSmtp(
        $CONFIG['smtp_host'], $CONFIG['smtp_port'], $CONFIG['smtp_secure'],
        $CONFIG['smtp_user'], $CONFIG['smtp_pass']
    );
    $sent = $smtp->send(
        $CONFIG['from_email'], $CONFIG['from_name'],
        $CONFIG['to_email'], $CONFIG['to_name'],
        $subject, $body
    );

    save_inquiry_csv(array(
        date('Y-m-d H:i:s'),
        isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '-',
        $name, $company, $email, $phone, $wechat, $contactApp, $category, $product, $qty, $msg,
        $sent ? '是' : '否'
    ));

    echo json_encode(array('ok' => true, 'email_sent' => $sent, 'msg' => 'ok'));
    exit;
}

/* 只有收到 POST 时才处理；test_mail.php 直接 require 本文件不会触发 */
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    handle_inquiry();
}
