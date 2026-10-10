<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  questions: { type: Array, required: true },
  count: { type: Number, default: 0 }
})

const shown = ref([])
const selected = ref([])
const submitted = ref(false)

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pick() {
  const n = props.count > 0 ? Math.min(props.count, props.questions.length) : props.questions.length
  shown.value = shuffle(props.questions).slice(0, n)
  selected.value = shown.value.map(() => -1)
  submitted.value = false
}

onMounted(pick)

function choose(qIndex, optIndex) {
  if (submitted.value) return
  const next = [...selected.value]
  next[qIndex] = optIndex
  selected.value = next
}

const answeredCount = computed(() => selected.value.filter((s) => s !== -1).length)
const allAnswered = computed(() => shown.value.length > 0 && answeredCount.value === shown.value.length)
const score = computed(() =>
  shown.value.reduce((acc, q, i) => (selected.value[i] === q.answer ? acc + 1 : acc), 0)
)

function submit() {
  if (allAnswered.value) submitted.value = true
}

function reset() {
  pick()
}

function optionClass(qIndex, optIndex) {
  if (!submitted.value) return { selected: selected.value[qIndex] === optIndex }
  const q = shown.value[qIndex]
  return {
    correct: optIndex === q.answer,
    wrong: selected.value[qIndex] === optIndex && optIndex !== q.answer
  }
}
</script>

<template>
  <div class="quiz">
    <p v-if="shown.length === 0" class="quiz-loading">Memuat soal...</p>

    <div v-for="(q, qi) in shown" :key="qi" class="quiz-item">
      <p class="quiz-question">{{ qi + 1 }}. {{ q.question }}</p>
      <ul class="quiz-options">
        <li
          v-for="(opt, oi) in q.options"
          :key="oi"
          class="quiz-option"
          :class="optionClass(qi, oi)"
          @click="choose(qi, oi)"
        >
          {{ opt }}
        </li>
      </ul>
      <p v-if="submitted && q.explanation" class="quiz-explanation">
        {{ q.explanation }}
      </p>
    </div>

    <div v-if="shown.length > 0" class="quiz-footer">
      <span v-if="!submitted" class="quiz-progress">
        Terjawab {{ answeredCount }}/{{ shown.length }}
      </span>
      <span v-else class="quiz-score">
        Skor: {{ score }}/{{ shown.length }} ({{ Math.round((score / shown.length) * 100) }}%)
      </span>
      <button v-if="!submitted" class="quiz-btn" :disabled="!allAnswered" @click="submit">
        Periksa Jawaban
      </button>
      <button v-else class="quiz-btn" @click="reset">Soal Baru</button>
    </div>
  </div>
</template>

<style scoped>
.quiz {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 20px 24px;
  margin: 24px 0;
  background: var(--vp-c-bg-soft);
}
.quiz-loading {
  font-weight: 600;
  color: var(--vp-c-text-2);
}
.quiz-item + .quiz-item {
  margin-top: 24px;
  border-top: 1px dashed var(--vp-c-divider);
  padding-top: 24px;
}
.quiz-question {
  font-weight: 600;
}
.quiz-options {
  list-style: none;
  padding: 0;
  margin: 12px 0 0;
}
.quiz-option {
  padding: 10px 14px;
  margin: 8px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.quiz-option:hover {
  border-color: var(--vp-c-brand-1);
}
.quiz-option.selected {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.quiz-option.correct {
  border-color: #22c55e;
  background: rgba(34, 197, 94, 0.12);
}
.quiz-option.wrong {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.12);
}
.quiz-explanation {
  margin-top: 10px;
  font-size: 0.9em;
  color: var(--vp-c-text-2);
}
.quiz-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  gap: 12px;
  flex-wrap: wrap;
}
.quiz-progress,
.quiz-score {
  font-weight: 600;
}
.quiz-btn {
  background: var(--vp-c-brand-1);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
}
.quiz-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
