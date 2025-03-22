<template>
  <div class="chat-input-container">
    <div class="input-area">
      <textarea
        ref="textareaRef"
        v-model="inputMessage"
        class="message-input"
        :placeholder="placeholder"
        @keydown.enter.exact.prevent="handleSend"
        @keydown.shift.enter.exact.prevent="handleNewLine"
        @input="handleInput"
      ></textarea>
      <button
        class="send-button"
        :disabled="!canSend || loading"
        @click="handleSend"
      >
        <!-- todo:添加停止生成按钮操作abort -->
        <font-awesome-icon icon="fa-solid fa-arrow-up" />
      </button>
    </div>

    <!-- <div class="toolbar">
      <button class="tool-button">
        <font-awesome-icon icon="fa-solid fa-question" />
      </button>
      <button class="tool-button">
        <font-awesome-icon icon="fa-solid fa-tag" />
      </button>
    </div> -->
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";

const props = defineProps({
  placeholder: {
    type: String,
    default: "输入消息...",
  },

  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["send"]);

const inputMessage = ref("");
const textareaRef = ref(null);
const baseTextareaHeight = 40;

const canSend = computed(() => {
  return inputMessage.value.trim().length > 0;
});

const handleInput = () => {
  adjustTextareaHeight();
};

const adjustTextareaHeight = () => {
  nextTick(() => {
    const textarea = textareaRef.value;
    textarea.style.height = "auto";
    const newHeight = Math.min(
      textarea.scrollHeight,
      200 // max height
    );
    textarea.style.height = `${Math.max(newHeight, baseTextareaHeight)}px`;
  });
};

const handleNewLine = () => {
  inputMessage.value += "\n";
};

const handleSend = () => {
  if (!canSend.value || props.loading) return;

  const message = inputMessage.value.trim();
  emit("send", message);
  inputMessage.value = "";
  resetTextareaHeight();
};

const resetTextareaHeight = () => {
  nextTick(() => {
    textareaRef.value.style.height = `${baseTextareaHeight}px`;
  });
};
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.chat-input-container {
  flex-grow: 1;
  width: 100%;
  padding: 1rem;
  background: $background-color;
  border-top: 1px solid $border-color;
}

.input-area {
  position: relative;
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
}

.message-input {
  flex: 1;
  min-height: 40px;
  max-height: 200px;
  padding: 0.75rem 3rem 0.75rem 1rem;
  border: 1px solid $border-color;
  border-radius: 1.5rem;
  background: $input-bg;
  color: $text-primary;
  font-size: 1rem;
  line-height: 1.5;
  resize: none;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: $primary-color;
    box-shadow: 0 0 0 2px rgba($primary-color, 0.1);
  }

  &::placeholder {
    color: $text-secondary;
  }
}

.send-button {
  position: absolute;
  right: 0.75rem;
  bottom: 0.5rem;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: $primary-color;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: darken($primary-color, 10%);
    transform: scale(1.05);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    background: $disabled-color;
    cursor: not-allowed;
  }
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-top: 0.75rem;
}

.tool-button {
  padding: 0.5rem;
  border: none;
  background: none;
  color: $text-secondary;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: $hover-bg;
    color: $text-primary;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
}
</style>