const { execSync } = require('child_process');

try {
    console.log('Resetting to commit 235b522...');
    execSync('git reset --hard 235b522b3da3cc5b4b2b9f595cc6b2571b7d7c3a', { stdio: 'inherit' });
    
    console.log('Force pushing to origin/main...');
    execSync('git push --force origin main', { stdio: 'inherit' });
    
    console.log('Successfully reset and force pushed!');
} catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
}

