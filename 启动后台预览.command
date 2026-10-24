#!/bin/zsh
set -e
cd "$(dirname "$0")"
LDYZ_NODE="$(command -v node || true)"
if [[ -z "$LDYZ_NODE" ]]; then
  LDYZ_NODE="$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
fi
if [[ ! -x "$LDYZ_NODE" ]]; then
  echo "未找到 Node.js 20 或更新版本，请在 Codex 中让助手启动预览。"
  read -r "?按回车关闭"
  exit 1
fi
if [[ ! -d node_modules/decap-server ]]; then
  echo "当前目录还没有安装后台依赖，请按 README-CONTENT-ADMIN.md 的步骤安装。"
  read -r "?按回车关闭"
  exit 1
fi
exec "$LDYZ_NODE" scripts/preview.mjs
