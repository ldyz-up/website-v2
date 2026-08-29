<?php
/**
 * LongDe Yizhi 官网 · SMTP 发信测试页
 * 用途：上线后验证 send_mail.php 里的邮箱配置是否成功。
 * 方法：浏览器打开本页面 → 点「发送测试邮件」→ 查看结果。
 * 安全：测试完成后，建议删除或重命名本文件（如 test_mail_xxx.php）。
 */

require __DIR__ . '/send_mail.php';

$result = null;   // success / fail
$error  = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'test') {
    $smtp = new SimpleSmtp(
        $CONFIG['smtp_host'], $CONFIG['smtp_port'], $CONFIG['smtp_secure'],
        $CONFIG['smtp_user'], $CONFIG['smtp_pass']
    );
    $subject = '【LongDe Yizhi 官网】SMTP 测试邮件';
    $body  = '<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#16324F;">';
    $body .= '<h3 style="color:#16324F;">这是一封测试邮件</h3>';
    $body .= '<p>如果您收到了这封邮件，说明官网询价表单的发信配置已经成功。</p>';
    $body .= '<p>发送时间: ' . date('Y-m-d H:i:s') . '</p>';
    $body .= '<p>收件人: ' . htmlspecialchars($CONFIG['to_email'], ENT_QUOTES, 'UTF-8') . '</p>';
    $body .= '</div>';
    $ok = $smtp->send(
        $CONFIG['from_email'], $CONFIG['from_name'],
        $CONFIG['to_email'], $CONFIG['to_name'],
        $subject, $body
    );
    if ($ok) {
        $result = 'success';
    } else {
        $result = 'fail';
        $error  = $smtp->lastError;
    }
}
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>邮箱发送测试 - LongDe Yizhi</title>
<style>
  body { font-family: -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif; background: #F7F6EF; color: #16324F; margin: 0; padding: 40px 16px; }
  .card { max-width: 680px; margin: 0 auto; background: #fff; border-radius: 14px; padding: 32px; box-shadow: 0 4px 18px rgba(22,50,79,.08); }
  h1 { font-size: 22px; margin: 0 0 6px; }
  .sub { color: #6b7683; font-size: 14px; margin-bottom: 24px; line-height: 1.7; }
  table { width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px; }
  td { padding: 9px 10px; border-bottom: 1px solid #ece8dd; vertical-align: top; }
  td:first-child { width: 120px; color: #8a8f96; }
  .ok { background: #e8f3ec; color: #2f6b4f; padding: 12px 14px; border-radius: 8px; font-size: 14px; margin-bottom: 20px; }
  .fail { background: #fbeae8; color: #b03a2e; padding: 12px 14px; border-radius: 8px; font-size: 14px; margin-bottom: 20px; word-break: break-all; }
  button { background: #16324F; color: #fff; border: 0; padding: 12px 22px; border-radius: 8px; font-size: 15px; cursor: pointer; }
  button:hover { opacity: .9; }
  .tip { background: #f3f1e8; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #5a6066; line-height: 1.8; margin-top: 24px; }
  .tip b { color: #16324F; }
</style>
</head>
<body>
<div class="card">
  <h1>📮 邮箱发送测试</h1>
  <p class="sub">验证官网询价表单的 SMTP 配置。配置信息在 <b>send_mail.php</b> 顶部的「配置区」里修改。</p>

  <?php if ($result === 'success'): ?>
    <div class="ok">✅ 测试邮件已发送成功！请到 <?php echo htmlspecialchars($CONFIG['to_email'], ENT_QUOTES, 'UTF-8'); ?> 查收。</div>
  <?php elseif ($result === 'fail'): ?>
    <div class="fail">❌ 发送失败：<?php echo htmlspecialchars($error, ENT_QUOTES, 'UTF-8'); ?><br>请检查 send_mail.php 里的 SMTP 账号、客户端授权密码和端口。</div>
  <?php endif; ?>

  <table>
    <tr><td>SMTP 服务器</td><td><?php echo htmlspecialchars($CONFIG['smtp_host'] . ':' . $CONFIG['smtp_port'] . ' (' . $CONFIG['smtp_secure'] . ')', ENT_QUOTES, 'UTF-8'); ?></td></tr>
    <tr><td>发件邮箱</td><td><?php echo htmlspecialchars($CONFIG['from_email'], ENT_QUOTES, 'UTF-8'); ?></td></tr>
    <tr><td>收件邮箱</td><td><?php echo htmlspecialchars($CONFIG['to_email'], ENT_QUOTES, 'UTF-8'); ?></td></tr>
    <tr><td>备份文件</td><td>服务器网站目录的上一级：<b>inquiries/inquiries.csv</b></td></tr>
  </table>

  <form method="post">
    <input type="hidden" name="action" value="test">
    <button type="submit">发送测试邮件</button>
  </form>

  <div class="tip">
    <b>小提示：</b>如何获取企微邮箱的 SMTP 客户端授权密码：<br>
    ① 电脑浏览器打开 <b>https://exmail.qq.com</b>，用企微邮箱账号（如 sales@longdeyizhi.com）登录；<br>
    ② 进入 <b>设置 → 收发信设置 → 客户端设置</b>，开启「SMTP 服务」；<br>
    ③ 点击「生成客户端授权密码」（⚠️ 不是登录密码，只显示一次，请立即复制保存）；<br>
    ④ 把授权密码填到 <b>send_mail.php</b> 顶部的 <b>smtp_pass</b> 里，保存后再点本页测试按钮。<br>
    如果开启 SMTP 时提示需要添加 MX / SPF 解析记录，请按提示在域名解析里添加（阿里云域名控制台 → 解析设置）。<br>
    测试成功后，请删除本文件（test_mail.php）防止被他人使用。
  </div>
</div>
</body>
</html>
