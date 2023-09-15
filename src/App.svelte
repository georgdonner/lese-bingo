<script>
  let words = [];
  let word = '';
  let boards = '1';
  let grid = '5';

  if (localStorage.getItem('words')) {
    words = JSON.parse(localStorage.getItem('words'));
  }

  const handleSubmit = () => {
    words = [...words, word];
    word = '';
    localStorage.setItem('words', JSON.stringify(words));
  };

  const handleClear = () => {
    words = [];
    localStorage.clear();
  }

  const shuffle = (array) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  };
</script>

<main>
  <div class="head">
    <h1>Lese-Bingo</h1>
  
    <form on:submit|preventDefault={handleSubmit}>
      <label for="word">Neues Wort: </label>
      <input bind:value={word} type="text" name="word" id="word">
    </form>

    <button on:click={handleClear}>Wörter löschen</button>

    <br style="margin-bottom: 1.5rem;">
  
    <label for="boards">Anzahl Bretter: </label>
    <input bind:value={boards} type="number" name="boards" id="boards" min="1">

    <label for="grid">Anzahl Spalten: </label>
    <input bind:value={grid} type="number" name="grid" id="grid" min="2">
  </div>

  <div class="bingo cut" style="grid-template-columns: repeat({grid}, 1fr);">
    {#each words as word}
      <div>{word}</div>
    {/each}
  </div>

  {#each Array(Number(boards)) as i}
    <div class="bingo board" style="grid-template-columns: repeat({grid}, 1fr);">
      {#each shuffle(words) as word}
        <div>{word}</div>
      {/each}
    </div>
  {/each}
</main>
