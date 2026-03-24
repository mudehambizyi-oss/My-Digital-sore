const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

// Professional Product Data
const products = [
    { id: 1, name: "SME Digital Toolkit", price: 120, img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500", desc: "Facebook & WhatsApp marketing for Zambian shops." },
    { id: 2, name: "Kwacha Savings Tracker", price: 40, img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500", desc: "Manage your MoMo and savings like a pro." },
    { id: 3, name: "Remote Work Guide", price: 95, img: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500", desc: "Earn USD on Upwork and withdraw to ZMW." },
    { id: 4, name: "Student Success Pack", price: 60, img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500", desc: "APA referencing and Research guide for Rusangu." }
];

const layout = (title, content, showNav = true) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        :root { --primary: #1a2a6c; --secondary: #f39c12; --success: #27ae60; --dark: #2c3e50; }
        body { font-family: 'Segoe UI', sans-serif; margin: 0; background: #f0f2f5; color: var(--dark); }
        nav { background: var(--primary); padding: 15px; text-align: center; display: ${showNav ? 'block' : 'none'}; }
        nav a { color: white; text-decoration: none; margin: 0 15px; font-weight: bold; }
        .auth-screen { background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200'); 
                       height: 100vh; display: flex; align-items: center; justify-content: center; background-size: cover; background-position: center; }
        .card { background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); width: 90%; max-width: 380px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; padding: 20px; max-width: 1200px; margin: auto; }
        .p-card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
        .p-img { width: 100%; height: 200px; object-fit: cover; }
        .btn { display: block; width: 100%; padding: 14px; background: var(--success); color: white; text-align: center; 
               text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 10px; border: none; cursor: pointer; font-size: 16px; }
        input { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd; border-radius: 8px; box-sizing: border-box; }
    </style>
</head>
<body>
    <nav><a href="/">HOME</a><a href="/login">LOGOUT</a></nav>
    ${content}
</body>
</html>`;

// Auth Routes
app.get('/login', (req, res) => res.send(layout('Login', `
<div class="auth-screen">
    <div class="card">
        <h2 style="text-align:center; color:var(--primary); margin-top:0;">Welcome Back</h2>
        <input type="email" placeholder="Email Address">
        <input type="password" placeholder="Password">
        <button class="btn" onclick="location.href='/'">LOGIN</button>
        <div style="text-align:center; margin-top:15px; font-size:14px;">
            <a href="/forgot" style="text-decoration:none; color:var(--primary)">Forgot Password?</a><br><br>
            Don't have an account? <a href="/signup" style="text-decoration:none; color:var(--primary); font-weight:bold;">Sign Up</a>
        </div>
    </div>
</div>`, false)));

app.get('/signup', (req, res) => res.send(layout('Sign Up', `
<div class="auth-screen">
    <div class="card">
        <h2 style="text-align:center; color:var(--primary); margin-top:0;">Create Account</h2>
        <input type="text" placeholder="Full Name">
        <input type="email" placeholder="Email Address">
        <input type="password" placeholder="Create Password">
        <button class="btn" onclick="location.href='/login'">SIGN UP</button>
        <div style="text-align:center; margin-top:15px; font-size:14px;">Already have an account? <a href="/login" style="text-decoration:none; color:var(--primary); font-weight:bold;">Login</a></div>
    </div>
</div>`, false)));

app.get('/forgot', (req, res) => res.send(layout('Reset Password', `
<div class="auth-screen">
    <div class="card">
        <h2 style="margin-top:0">Reset Password</h2>
        <p style="color:#666">Enter your email for a reset link.</p>
        <input type="email" placeholder="Email Address">
        <button class="btn">SEND RESET LINK</button>
        <div style="text-align:center; margin-top:15px;"><a href="/login" style="text-decoration:none; color:var(--primary)">Back to Login</a></div>
    </div>
</div>`, false)));

// Main Store Route
app.get('/', (req, res) => {
    let items = products.map(p => `
    <div class="p-card">
        <img src="${p.img}" class="p-img">
        <div style="padding:20px">
            <h3 style="margin-top:0">${p.name}</h3>
            <p style="color:#666; font-size:14px; line-height:1.4">${p.desc}</p>
            <p style="font-size:1.2em; font-weight:bold; color:var(--primary); margin: 10px 0;">K${p.price}</p>
            <a href="/pay/${p.id}" class="btn">GET THIS GUIDE</a>
        </div>
    </div>`).join('');
    res.send(layout('My Digital Store', `
        <div style="padding:30px 20px; text-align:center; background:white;">
            <h1 style="margin:0; color:var(--primary);">🇿🇲 Digital Success Store</h1>
            <p style="color:#666;">Premium guides for students & entrepreneurs</p>
        </div>
        <div class="grid">${items}</div>
    `));
});

// Checkout Route
app.get('/pay/:id', (req, res) => {
    const p = products.find(x => x.id == req.params.id);
    if (!p) return res.redirect('/');
    res.send(layout('Secure Checkout', `
    <div style="max-width:500px; margin:40px auto; background:white; padding:30px; border-radius:15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1)">
        <h2 style="margin-top:0">Checkout: ${p.name}</h2>
        <p style="font-size:1.1em">Total to Pay: <b style="color:var(--primary)">K${p.price}</b></p>
        <hr style="border:0; border-top:1px solid #eee; margin:20px 0;">
        
        <h4 style="margin-bottom:5px">Option 1: Mobile Money (Zambia)</h4>
        <p style="background:#f9f9f9; padding:15px; border-radius:8px; border-left:4px solid var(--secondary)">
            <b>Airtel:</b> 0973053584<br>
            <b>MTN:</b> 0768084091
        </p>
        
        <h4 style="margin-bottom:5px">Option 2: AirTM (Global USD)</h4>
        <p style="background:#f9f9f9; padding:15px; border-radius:8px; border-left:4px solid #3498db">
            Send to Email: <b>mudehambizyi@gmail.com</b>
        </p>
        
        <a href="https://wa.me/260973053584?text=Hello!%20I%20have%20sent%20payment%20for%20${encodeURIComponent(p.name)}" class="btn" style="background:#25D366">I HAVE SENT PAYMENT</a>
    </div>`));
});

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server is listening on port ${PORT}`));
