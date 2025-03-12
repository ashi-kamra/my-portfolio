<svelte:head>
    <title>Contact Me</title>
</svelte:head>

<h1>My Contacts</h1>
    
<form method="get" action="mailto:ashimak@mit.edu" enctype="text/plain">
    <label>
        Email:
        <input type="email" name="email"/>
    </label>
    <label>
        Subject:
        <input type="text" name="subject"/>
    </label>
    <label>
        Body:
        <textarea name="body"></textarea>
    </label>
    <button type="submit">Submit</button>
</form>
    
<style>
    form {
  margin-top: 1em;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1em;
}

label {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
  
}

</style>