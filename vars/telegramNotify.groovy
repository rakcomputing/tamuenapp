def call(String message, String botToken, String chatId) {
    sh """
        curl -s -X POST https://api.telegram.org/bot${botToken}/sendMessage \\
            -d chat_id=${chatId} \\
            -d parse_mode=Markdown \\
            -d text="${message}"
    """
}
