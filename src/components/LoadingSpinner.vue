<template>
  <div class="spinner-wrapper" :class="{ 'spinner-wrapper--fullpage': fullpage }">
    <div class="spinner">
      <div class="spinner__ring" />
      <div class="spinner__ring spinner__ring--delay" />
    </div>
    <p v-if="message" class="spinner__message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    message?: string
    fullpage?: boolean
  }>(),
  { message: '', fullpage: false },
)
</script>

<style scoped>
.spinner-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 40px;
}

.spinner-wrapper--fullpage {
  min-height: 300px;
}

.spinner {
  position: relative;
  width: 56px;
  height: 56px;
}

.spinner__ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: rgba(255, 255, 255, 0.9);
  animation: spin 1s linear infinite;
}

.spinner__ring--delay {
  border-top-color: rgba(255, 255, 255, 0.4);
  animation-delay: -0.4s;
  inset: 8px;
}

.spinner__message {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  text-align: center;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
