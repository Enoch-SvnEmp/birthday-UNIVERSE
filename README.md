# M'LADY's Birthday Universe

A cinematic, interactive birthday experience built as a modular static app.

## Edit The Content

Update `src/config/content.js` to replace:

- M'LADY's photos and captions
- Birthday message
- Background music path
- Secret messages
- Final signature

Photo files can go in `assets/photos/`. Music can go in `assets/music/`.

Example:

```js
photos: [
  {
    src: "./assets/photos/M'LADY's-01.jpg",
    alt: "M'LADY's smiling at dinner",
    caption: "The smile that changed the weather.",
    fallbackTitle: "M'LADY's I",
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
