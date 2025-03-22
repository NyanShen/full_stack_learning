// useStream.js
import { ref, reactive, isReactive } from 'vue';
export function useStream() {
    const messages = ref([]);
    const currentBotMessage = ref(null);
    /**
     * @param {*} msg 
     */
    const appendMessage = (msg, type="text") => {
        messages.value.push({
            id: Date.now().toString(),
            senderType: 'user',
            contentType: type,
            content: msg,
            status: 'sent',
            isBot: false,
            timestamp: Date.now(),
        });
    };

    const startStreamMessage = async (type = 'markdown') => {
        currentBotMessage.value = reactive({ 
            id: Date.now().toString(), 
            senderType: 'assistant',
            contentType: type,
            content: '',
            status: 'received', 
            isBot: true,
            timestamp: Date.now(),
         });
        messages.value.push(currentBotMessage.value);
    };

    const appendStreamMessage = (data) => {
        currentBotMessage.value.content += data;
        messages.value.splice(messages.value.length - 1, 1, { ...currentBotMessage.value });
      }; 

    return { messages, appendMessage, startStreamMessage, appendStreamMessage };
}