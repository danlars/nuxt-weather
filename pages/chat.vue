<template>
  <BaseContent>
    <div class="flex flex-1 flex-col contain-content overflow-auto gap-4">
      <ChatBubble
          v-for="(message, index) in messages"
          :key="message.username + ': ' + message.message + ' ' + index"
          :color="message.username === username ? 'tertiary' : 'primary'"
          :class="{'ms-14': message.username === username, 'me-14': message.username !== username}">
        {{ message.username }}: {{ message.message }}
      </ChatBubble>
    </div>
    <div class="flex flex-col gap-4 pt-4">
      <input
          id="username"
          v-model="username"
          class="border-[2px] border-solid rounded border-slate-700 w-full px-3 py-2"
          placeholder="username"
      >
      <textarea
          id="message"
          v-model="userMessage" class="border-[2px] border-solid rounded border-slate-700 w-full px-3 py-2"
          placeholder="Write message"
          rows="5"
          autocomplete="off"
          @keydown.enter.shift="sendMessage"
          @keydown.enter.ctrl="sendMessage"
      />
      <div class="flex justify-end">
        <BaseButton size="lg" @click="sendMessage">
          Send besked
        </BaseButton>
      </div>
    </div>
  </BaseContent>
</template>
<script setup lang="ts">
type messageType = { username: string, message: string };

const username = ref('');
const userMessage = ref('');
const messages = ref<messageType[]>([]);

const updateMessages = (newMessage: messageType) => {
  messages.value = [...messages.value, newMessage];
}
const socket = useWebsocket<messageType>(updateMessages);
const sendMessage = () => {
  socket.sendMessage({username: username.value, message: userMessage.value});
  messages.value = [...messages.value, {username: username.value, message: userMessage.value}];
  userMessage.value = '';
}
</script>