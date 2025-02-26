// script.js
document.getElementById('ask-button').addEventListener('click', async () => {
    // 显示思考提示
    const thinkingElement = document.getElementById('thinking');
    thinkingElement.style.display = 'block';

    // 模拟后端请求，这里可以替换为实际的API调用
    const response = await simulateBackendRequest();

    // 隐藏思考提示
    thinkingElement.style.display = 'none';

    // 显示逐个字出现的效果
    const answerElement = document.getElementById('answer');
    showAnswerGradually(answerElement, response);
});

// 模拟后端请求
async function simulateBackendRequest() {
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 2000));
    return "这是一个AI回答的示例，逐个字显示效果。";
}

// 逐个字显示回答
function showAnswerGradually(element, answer) {
    let index = 0;
    const intervalId = setInterval(() => {
        if (index < answer.length) {
            element.textContent += answer[index];
            index++;
        } else {
            clearInterval(intervalId);
        }
    }, 100);
}