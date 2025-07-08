pipeline {
    agent any
    tools{
        nodejs 'Nodejs-Engin'
    }
    environment {
        domain_name = 'tamuenapp'
        container_name = 'tamuenapp-cont'
        service_port = '3002'
    }

    stages {
        steps("Clone Repository") {
            steps {
                git branch: 'main', url: 'https://github.com/rakcomputing/tamuenapp'

        }
        steps("Run Tests") {
            steps {
                sh """
                    echo "🔍 Running tests..."
                    npm install
                    npm test
                """
            }

        }

        stage("Build") {
            steps {
                sh """
                    echo "📦 Building Docker image..."
                    ls -la
                    docker buildx build -t TamuenApp .
                """
            }
        }

        stage("Check Container") {
            steps {
                sh """
                    echo "🧼 Removing old container (if exists)..."
                    docker rm -f ${container_name} || true
                    echo "✅ Done."
                """
            }
        }

        stage("Deploy") {
            steps {
                sh """
                    echo "🚀 Deploying container on port ${service_port}"
                    docker run -dp ${service_port}:3000 \\
                        --name ${container_name} \\
                        --restart unless-stopped \\
                        TamuenApp
                """
            }
        }

        stage("Add Domain Name") {
            steps {
                sh """
                    echo "🔧 Creating NGINX config for domain ${domain_name}.rakdev.online..."

                    CONFIG_PATH="/etc/nginx/conf.d/${domain_name}.conf"

                    if [ -f "\$CONFIG_PATH" ]; then
                        echo "🗑️ Removing existing config: \$CONFIG_PATH"
                        sudo rm -f "\$CONFIG_PATH"
                    fi

                    sudo tee "\$CONFIG_PATH" > /dev/null <<'EOF'
# NGINX configuration for ${domain_name}.rakdev.online
server {
    listen 80;
    listen [::]:80;
    server_name ${domain_name}.rakdev.online;

    location / {
        proxy_pass http://localhost:${service_port};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

                    echo "✅ NGINX config created."
                    echo "🔁 Reloading NGINX..."
                    sudo nginx -t && sudo systemctl reload nginx && echo "✅ NGINX reloaded."
                    sudo certbot --nginx -d ${domain_name}.rakdev.online --non-interactive --agree-tos --email raksmey.itmoh@gmail.com
                    echo "✅ NGINX reloaded with new config for ${domain_name}.rakdev.online"
                """
            }
        }

        // stage("Check domain") {
        //     steps {
        //         sh """
        //             echo "🌐 Checking domain ${domain_name}.rakdev.online..."
        //             curl -I http://${domain_name}.rakdev.online
        //         """
        //     }
        // }
    }
}
}