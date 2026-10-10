<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  questions: { type: Array, required: true }
})

const selected = ref(props.questions.map(() => -1))
const submitted = ref(false)

function choose(qIndex, optIndex) {
  if (submitted.value) return
  const next = [...selected.value]
  next[qIndex] = optIndex
  selected.value = next
}

const answeredCount = computed(() => selected.value.filter((s) => s !== -1).length)
const allAnswered = computed(() => answeredCount.value === props.questions.length)
const score = computed(() =>
  props.questions.reduce((acc, q, i) => (selected.value[i] === q.answer ? acc + 1 : acc), 0)
)

function submit() {
  if (allAnswered.value) submitted.value = true
}

function reset() {
  selected.value = props.questions.map(() => -1)
  submitted.value = false
}

function optionClass(qIndex, optIndex) {
  if (!submitted.value) return { selected: selected.value[qIndex] === optIndex }
  const q = props.questions[qIndex]
  return {
    correct: optIndex === q.answer,
    wrong: selected.value[qIndex] === optIndex && optIndex !== q.answer
  }
}
</script>

<template>
  <div class="quiz">
    <div v-for="(q, qi) in questions" :key="qi" class="quiz-item">
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

    <div class="quiz-footer">
      <span v-if="!submitted" class="quiz-progress">
        Terjawab {{ answeredCount }}/{{ questions.length }}
      </span>
      <span v-else class="quiz-score">
        Skor: {{ score }}/{{ questions.length }} ({{ Math.round((score / questions.length) * 100) }}%)
      </span>
      <button v-if="!submitted" class="quiz-btn" :disabled="!allAnswered" @click="submit">
        Periksa Jawaban
      </button>
      <button v-else class="quiz-btn" @click="reset">Ulangi</button>
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
