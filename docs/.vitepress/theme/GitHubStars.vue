<script setup>
import { onMounted, ref } from 'vue'

const stars = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('https://api.github.com/repos/Liyuk/Interview-Book')
    if (!response.ok) return

    const repository = await response.json()
    stars.value = new Intl.NumberFormat().format(repository.stargazers_count)
  } catch {
    // Keep the GitHub link available if the public API is temporarily unavailable.
  }
})
</script>

<template>
  <a
    class="github-stars"
    href="https://github.com/Liyuk/Interview-Book"
    target="_blank"
    rel="noreferrer"
    aria-label="Interview Book on GitHub"
  >
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 .8 10.2 5l4.6.7-3.3 3.2.8 4.6L8 11.3l-4.3 2.2.8-4.6L1.2 5.7 5.8 5 8 .8Z" />
    </svg>
    <span>Star</span>
    <span v-if="stars" class="github-stars__count">{{ stars }}</span>
  </a>
</template>
