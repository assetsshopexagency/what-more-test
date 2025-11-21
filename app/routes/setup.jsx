// app/routes/setup.jsx
export default function SetupPage() {
    return (
      <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial' }}>
        <h1>🚀 Setup EE-Watch App</h1>
        
        <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h3>📋 Step-by-Step Setup:</h3>
          <ol>
            <li>
              <strong>Create Private App in Shopify:</strong>
              <ul>
                <li>Go to Shopify Admin → Settings → Apps & channels</li>
                <li>Click "Develop apps" → "Create an app"</li>
                <li>App name: "EE-Watch"</li>
                <li>Configure admin API scopes: <code>read_products, write_products, read_files, write_files</code></li>
                <li>Save and copy the Admin API access token</li>
              </ul>
            </li>
            <li>
              <strong>Configure Your App:</strong>
              <ul>
                <li>Update your <code>.env</code> file with the token</li>
                <li>Or use the form below to test the connection</li>
              </ul>
            </li>
            <li>
              <strong>Initialize Session:</strong>
              <ul>
                <li>The app will automatically create a session</li>
                <li>You're ready to use all features!</li>
              </ul>
            </li>
          </ol>
        </div>
  
        <div style={{ background: '#e8f4fd', padding: '20px', borderRadius: '8px' }}>
          <h3>🔧 Test Connection</h3>
          <form action="/init-session" method="POST">
            <div style={{ marginBottom: '15px' }}>
              <label><strong>Shopify Store URL:</strong></label><br />
              <input 
                type="text" 
                name="shop" 
                placeholder="your-store.myshopify.com" 
                style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                required 
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label><strong>Admin API Access Token:</strong></label><br />
              <input 
                type="password" 
                name="accessToken" 
                placeholder="shpat_..." 
                style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                required 
              />
            </div>
            <button 
              type="submit" 
              style={{ 
                padding: '12px 24px', 
                backgroundColor: '#1971c2', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Test & Initialize Session
            </button>
          </form>
        </div>
  
        <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
          <p><strong>💡 Tip:</strong> After setup, your session will be automatically managed. 
          The access token is securely stored in your database.</p>
        </div>
      </div>
    );
  }