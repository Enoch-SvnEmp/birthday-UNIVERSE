# Esther's Birthday Universe

A cinematic, interactive birthday experience built as a modular static app.

## Edit The Content

Update `src/config/content.js` to replace:

- Esther's photos and captions
- Birthday message
- Background music path
- Secret messages
- Final signature

Photo files can go in `assets/photos/`. Music can go in `assets/music/`.

Example:

```js
photos: [
  {
    src: "./assets/photos/esther-01.jpg",
    alt: "Esther smiling at dinner",
    caption: "The smile that changed the weather.",
    fallbackTitle: "Esther I",
  },
]
```

For music:

```js
music: {
  src: "./assets/music/song.mp3",
  label: "Birthday ambience",
}
```

## Run Locally

From this folder:

```powershell
python -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/
```
