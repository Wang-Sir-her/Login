const express = require('express');
const cors = require('cors'); 
const app = express();
const port = 3000;



app.use(cors({
  origin: 'https://login-woad-gamma.vercel.app' // 允许前端的源访问
}));
// 解析 JSON 请求体（必须添加，否则无法获取 req.body）
app.use(express.json());

// 硬编码的正确账号密码（实际项目中会从数据库查询）
const validUser = {
  username: 'admin',
  password: '123456'
};

// 生成模拟 Token（简单随机字符串，实际项目用 jsonwebtoken 生成）
function generateToken() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 12; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

// POST /api/login 接口
app.post('/api/login', (req, res) => {
  // 获取前端端传来的用户名和密码
  const { username, password } = req.body;

  // 校验参数是否存在
  if (!username || !password) {
    return res.json({
      code: 1,
      message: 'Username and password are required',
      data: null
    });
  }

  // 校验校验账号密码是否正确
  if (username === validUser.username && password === validUser.password) {
    // 登录成功，返回 Token
    return res.json({
      code: 0,
      message: 'Login successful',
      data: {
        token: generateToken() // 生成随机 Token
      }
    });
  } else {
    // 登录失败
    return res.json({
      code: 1,
      message: 'Invalid username or password',
      data: null
    });
  }
});

// 启动服务
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

