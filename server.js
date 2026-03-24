const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

// Detailed Product Data
const products = [
    { 
        id: 1, 
        name: "SME Digital Toolkit", 
        price: 120, 
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500", 
        desc: "The ultimate guide for Zambian shop owners. Learn to use Facebook Ads for K50/day, master WhatsApp Business labels, and use Canva to create professional Blue & Gold brand visuals. Grow your reach from Lusaka to the Copperbelt!" 
    },
    { 
        id: 2, 
        name: "Kwacha Savings Tracker", 
        price: 40, 
        img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500", 
        desc: "Stop 'impulse spending' on your Mobile Money. This tracker includes the 50/30/20 rule for ZMW, tips on using Airtel/MTN 'Savings Vaults', and a template to manage your income vs. expenses every month." 
    },
    { 
        id: 3, 
        name: "Remote Work Guide", 
        price: 95, 
        img: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500", 
        desc: "Earn USD while studying at Rusangu! Step-by-step instructions on setting up Upwork/Fiverr in Zambia, creating a Payoneer account, and withdrawing your hard-earned Dollars directly to your FNB or Atlas Mara account." 
    },
    { 
        id: 4, 
        name: "Student Success Pack", 
        price: 60, 
        img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500", 
        desc: "A must-have for every Rusangu student. Includes APA 7th Edition referencing hacks, how to use Google Scholar for assignments, and the 'Pomodoro' study method to ace your final exams without burnout." 
    }
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
        .p-card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); display: flex; flex-direction: column; }
        .p-img { width: 100%; height: 200px; object-fit: cover; }
        .p-body { padding: 20px; flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between; }
        .btn { display: block; width: 100%; padding: 14px; background: var(--success); color: white; text-align: center; 
               text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 10px; border: none; cursor: pointer; font-size: 16px; box-sizing: border-box; }
        input { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd; border-radius: 8px; box-sizing: border-box; }
    </style>
</head>
<body>
    <nav><a href="/">HOME</a><a href="/login">LOGOUT</a></nav>
    ${content}
</body>
</html>`;

app.get('/login', (req, res) => res.send(layout('Login', `
<div class="auth-screen">
    <div class="card">
        <h2 style="text-align:center; color:var(--primary); margin-top:0;">Welcome Back</h2>
        <input type="email" placeholder="Email Address">
        <input type="password" placeholder="Password">
        <button class="btn" onclick="location.href='/'">LOGIN</button>
        <div style="text-align:center; margin-top:15px; font-size:14px;"><a href="/forgot" style="color:var(--primary); text-decoration:none;">Forgot Password?</a> | <a href="/signup" style="color:var(--primary); text-decoration:none; font-weight:bold;">Sign Up</a></div>
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
        <div style="text-align:center; margin-top:15px;"><a href="/login" style="color:var(--primary); text-decoration:none;">Already have an account? Login</a></div>
    </div>
</div>`, false)));

app.get('/', (req, res) => {
    let items = products.map(p => `
    <div class="p-card">
        <img src="${p.img}" class="p-img">
        <div class="p-body">
            <div>
                <h3 style="margin-top:0">${p.name}</h3>
                <p style="color:#666; font-size:14px; line-height:1.5">${p.desc}</p>
            </div>
            <div>
                <p style="font-size:1.2em; font-weight:bold; color:var(--primary); margin: 10px 0;">K${p.price}</p>
                <a href="/pay/${p.id}" class="btn">VIEW CHECKOUT</a>
            </div>
        </div>
    </div>`).join('');
    res.send(layout('My Digital Store', `
        <div style="padding:40px 20px; text-align:center; background:white;">
            <h1 style="margin:0; color:var(--primary);">🇿🇲 Digital Success Store</h1>
            <p style="color:#666;">Tools for Zambian Students & Business Owners</p>
        </div>
        <div class="grid">${items}</div>
    `));
});

app.get('/pay/:id', (req, res) => {
    const p = products.find(x => x.id == req.params.id);
    if (!p) return res.redirect('/');
    res.send(layout('Secure Checkout', `
    <div style="max-width:500px; margin:40px auto; background:white; padding:30px; border-radius:15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1)">
        <h2 style="margin-top:0">Order: ${p.name}</h2>
        <p>Price: <b style="color:var(--primary)">K${p.price}</b></p>
        <hr style="border:0; border-top:1px solid #eee; margin:20px 0;">
        <h4>Payment Instructions</h4>
        <p style="background:#f9f9f9; padding:15px; border-radius:8px; border-left:4px solid var(--secondary)">
            <b>Airtel Money:</b> 0973053584<br>
            <b>MTN Money:</b> 0768084091<br>
            <b>AirTM Email:</b> mudehambizyi@gmail.com
        </p>
        <a href="https://wa.me/260973053584?text=I%20sent%20K${p.price}%20for%20${encodeURIComponent(p.name)}" class="btn" style="background:#25D366">CONFIRM VIA WHATSAPP</a>
    </div>`));
});

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Store live on ${PORT}`));
