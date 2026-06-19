import os

files = [
    '/home/rishav/Downloads/Floréa/product.html',
    '/home/rishav/Downloads/Floréa/cart.html',
    '/home/rishav/Downloads/Floréa/js/components.js'
]

for file in files:
    with open(file, 'r') as f:
        content = f.read()
    
    # Remove the literal backslashes that were inserted before backticks and variables
    content = content.replace('\\`', '`')
    content = content.replace('\\${', '${')
    
    with open(file, 'w') as f:
        f.write(content)
