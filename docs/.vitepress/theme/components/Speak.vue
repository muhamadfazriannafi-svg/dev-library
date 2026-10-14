<script setup>
import { ref } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
  lang: { type: String, default: 'en-US' },
  rate: { type: Number, default: 0.95 },
  pitch: { type: Number, default: 1 },
  label: { type: String, default: '' },
  accents: { type: Boolean, default: false }
})

const speaking = ref('')
const supported = ref(true)

function pickVoice(lang) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null
  const voices = window.speechSynthesis.getVoices()
  if (!voices.length) return null
  const exact = voices.find((v) => v.lang.replace('_', '-').toLowerCase() === lang.toLowerCase())
  if (exact) return exact
  const prefix = lang.slice(0, 2).toLowerCase()
  return voices.find((v) => v.lang.replace('_', '-').toLowerCase().startsWith(prefix)) || null
}

function speak(lang) {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    supported.value = false
    return
  }
  window.speechSynthesis.cancel()
  const utter = new window.SpeechSynthesisUtterance(props.text)
  utter.lang = lang
  utter.rate = props.rate
  utter.pitch = props.pitch
  const voice = pickVoice(lang)
  if (voice) utter.voice = voice
  utter.onend = () => (speaking.value = '')
  utter.onerror = () => (speaking.value = '')
  speaking.value = lang
  window.speechSynthesis.speak(utter)
}
</script>

<template>
  <span class="speak">
    <button
      class="speak-btn"
      :class="{ active: speaking === lang }"
      type="button"
      :aria-label="`Play ${text}`"
      :title="`Dengarkan (${lang})`"
      @click="speak(lang)"
    >
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path
          fill="currentColor"
          d="M3 9v6h4l5 4V5L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a6.8 6.8 0 0 1 0 13.4v2.1A8.9 8.9 0 0 0 14 3.2z"
        />
      </svg>
      <span v-if="label" class="speak-label">{{ label }}</span>
    </button>
    <button
      v-if="accents"
      class="speak-btn"
      :class="{ active: speaking === 'en-GB' }"
      type="button"
      :aria-label="`Play ${text} (UK)`"
      title="Dengarkan (UK)"
      @click="speak('en-GB')"
    >
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path
          fill="currentColor"
          d="M3 9v6h4l5 4V5L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a6.8 6.8 0 0 1 0 13.4v2.1A8.9 8.9 0 0 0 14 3.2z"
        />
      </svg>
      <span v-if="label" class="speak-label">UK</span>
    </button>
    <span v-if="!supported" class="speak-hint">Browser tidak mendukung audio.</span>
  </span>
</template>

<style scoped>
.speak {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  vertical-align: middle;
}
.speak-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 9px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
  cursor: pointer;
  transition: all 0.2s;
  line-height: 1;
}
.speak-btn:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.speak-btn.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.speak-label {
  font-size: 0.75em;
  font-weight: 600;
}
.speak-hint {
  font-size: 0.8em;
  color: var(--vp-c-text-2);
}
</style>
