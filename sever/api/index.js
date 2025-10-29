const express = require('express');
const cors = require('cors');
const app = express();

// 配置 CORS：明确允许前端域名访问
app.use(cors({
  origin: 'https://login-datn-c3byfabvm-wangs-projects-3ee4f0d2.vercel.app', 
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true 
}));

// 解析 JSON 请求体
app.use(express.json());

// 硬编码账号密码
const validUser = { username: 'admin', password: '123456' };

// 生成模拟 Token
function generateToken() {
  return Math.random().toString(36).substring(2, 15);
}

// 登录接口
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.json({ code: 1, message: 'Username and password are required', data: null });
  }
  if (username === validUser.username && password === validUser.password) {
    return res.json({ code: 0, message: 'Login successful', data: { token: generateToken() } });
  } else {
    return res.json({ code: 1, message: 'Invalid username or password', data: null });
  }
});

// 处理预检请求（OPTIONS 方法）
app.options('*', cors());

// 启动服务
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

