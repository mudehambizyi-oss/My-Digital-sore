const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

const products = [
    { id: 1, name: "SME Digital Toolkit", price: 120, img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500", desc: "Master Facebook & WhatsApp marketing for Zambian shops." },
    { id: 2, name: "Kwacha Savings Tracker", price: 40, img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500", desc: "Manage your MoMo and savings with ZMW templates." },
    { id: 3, name: "Remote Work Guide", price: 95, img: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500", desc: "Earn USD on Upwork and withdraw to Zambian banks." },
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
        :root { --primary: #1a2a6c; --secondary: #f39c12; --success: #27ae60; }
        body { font-family: 'Segoe UI', sans-serif; margin: 0; background: #f0f2f5; }
        nav { background: var(--primary); padding: 15px; text-align: center; display: ${showNav ? 'block' : 'none'}; }
        nav a { color: white; text-decoration: none; margin: 0 15px; font-weight: bold; }
        .auth-screen { background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200'); 
                       height: 100vh; display: flex; align-items: center; justify-content: center; background-size: cover; background-position: center; }
        .card { background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); width: 90%; max-width: 380px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; padding: 20px; max-width: 1200px; margin: auto; }
        .p-card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
        .btn { display: block; width: 100%; padding: 14px; background: var(--success); color: white; text-align: center; 
               text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 10px; border: none; cursor: pointer; }
        input { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd; border-radius: 8px; box-sizing: border-box; }
    </style>
</head>
<body>
    <nav><a href="/store">STORE</a><a href="/refer">REFER & EARN</a><a href="/login">LOGOUT</a></nav>
    ${content}
</body>
</html>`;

// --- 🏠 THE FORCE SIGNUP ROUTE ---
app.get('/', (req, res) => {
    // This makes the main link direct straight to Signup
    res.redirect('/signup');
});

app.get('/signup', (req, res) => res.send(layout('Sign Up', `
<div class="auth-screen">
    <div class="card">
        <h2 style="text-align:center; color:var(--primary); margin-top:0;">Create Account</h2>
        <input type="text" placeholder="Full Name">
        <input type="email" placeholder="Email Address">
        <input type="password" placeholder="Create Password">
        <button class="btn" onclick="location.href='/store'">SIGN UP</button>
        <div style="text-align:center; margin-top:15px; font-size:14px;">
            Already have an account? <a href="/login">Login</a><br><br>
            <a href="/store" style="color:var(--secondary); text-decoration:none;">Or Browse Store First →</a>
        </div>
    </div>
</div>`, false)));

app.get('/login', (req, res) => res.send(layout('Login', `
<div class="auth-screen">
    <div class="card">
        <h2 style="text-align:center; color:var(--primary); margin-top:0;">Welcome Back</h2>
        <input type="email" placeholder="Email Address">
        <input type="password" placeholder="Password">
        <button class="btn" onclick="location.href='/store'">LOGIN</button>
        <div style="text-align:center; margin-top:15px; font-size:14px;"><a href="/signup">Sign Up</a></div>
    </div>
</div>`, false)));

app.get('/store', (req, res) => {
    let items = products.map(p => `
    <div class="p-card">
        <img src="${p.img}" style="width:100%; height:180px; object-fit:cover;">
        <div style="padding:20px">
            <h3>${p.name}</h3>
            <p style="color:#666; font-size:14px;">${p.desc}</p>
            <p style="font-weight:bold; color:var(--primary);">K${p.price}</p>
            <a href="/pay/${p.id}" class="btn">BUY NOW</a>
        </div>
    </div>`).join('');
    res.send(layout('Store Catalog', `<h1 style="text-align:center; color:var(--primary)">Digital Products</h1><div class="grid">${items}</div>`));
});

// Checkout & Other Routes
app.get('/pay/:id', (req, res) => {
    const p = products.find(x => x.id == req.params.id);
    res.send(layout('Payment', `<div class="card" style="margin:20px auto;">
        <h3>Order: ${p.name}</h3>
        <p>Price: K${p.price}</p>
        <p>Pay to Airtel: 0973053584 or MTN: 0768084091</p>
        <a href="https://wa.me/260973053584" class="btn">CONFIRM ON WHATSAPP</a>
    </div>`));
});

app.get('/refer', (req, res) => res.send(layout('Referral', `
<div class="card" style="margin:20px auto; text-align:center;">
    <h2>Earn K10 Per Sale!</h2>
    <p>Share the store link and get K10 for every person you refer.</p>
    <a href="https://wa.me/260973053584" class="btn">JOIN AS AGENT</a>
</div>`)));

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Store live on ${PORT}`));
