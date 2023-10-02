<script>
  import { shuffle, colors } from './utils';

  let words = [];
  let word = '';

  let boards = '1';
  let grid = '5';
  let color = shuffle(colors)[0];

  let importing = false;
  let importValue = '';
  
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
  };

  const handleImporting = () => {
    importing = !importing;
  };

  const importWords = () => {
    const newWords = importValue
      .split(importValue.includes(',') ? ',' : '\n')
      .map(it => it.trim());
    words = words.concat(newWords);
    localStorage.setItem('words', JSON.stringify(words));
    importing = false;
    importValue = '';
  };

  const deleteWord = (word) => {
    words = words.filter(it => it !== word);
    localStorage.setItem('words', JSON.stringify(words));
  };

  const newColor = () => {
    color = shuffle(colors)[0];
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

    <button on:click={handleImporting}>{importing ? 'Importieren ausblenden' : 'Wörter importieren'}</button>

    <br style="margin-bottom: 1.5rem;">

    {#if importing}
      <textarea bind:value={importValue} name="import" id="import" cols="30" rows="10"></textarea>
      <br>
      <button on:click={importWords}>Importieren</button>

      <br style="margin-bottom: 1.5rem;">
    {/if}
  
    <label for="boards">Anzahl Bretter: </label>
    <input bind:value={boards} type="number" name="boards" id="boards" min="1">

    <label for="grid">Anzahl Spalten: </label>
    <input bind:value={grid} type="number" name="grid" id="grid" min="2">

    <button on:click={newColor}>Neue Farbe</button>
  </div>

  <div class="bingo cut" style="grid-template-columns: repeat({grid}, 1fr);">
    {#each words as word}
      <div>
        {word}
        <button type="button" class="delete" on:click={() => deleteWord(word)}>
          x
        </button>
      </div>
    {/each}
  </div>

  {#each [...Array(Number(boards)).keys()] as i}
    <div
      class="bingo board"
      style="background-color: {color};grid-template-columns: repeat({grid}, 1fr);"
    >
      {#each shuffle(words) as word}
        <div>{word}</div>
      {/each}
    </div>
  {/each}
</main>
