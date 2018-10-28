export default function template(body, initialState) { return (
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta charset="UTF-8">
  <title>React</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <style>
    .header {border-bottom: 1px solid silver; margin-bottom: 20px;}
    .footer {
      border-top: 1px solid silver; padding-top: 5px; margin-top: 20px;
      font-family: Helvetica; font-size: 10px; color: grey;
    }
  </style>
</head>
<body>
<div id="mount-point">${body}</div>
<script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}</script>
<script src="/bundle.js"></script>
</body>
</html>
`)};