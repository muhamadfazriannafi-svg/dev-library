import DefaultTheme from 'vitepress/theme'
import Quiz from './components/Quiz.vue'
import Speak from './components/Speak.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Quiz', Quiz)
    app.component('Speak', Speak)
  }
}
