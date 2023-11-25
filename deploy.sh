 #!/bin/bash

ng build --output-path docs --base-href /wwang/

# For Github Pages, it looks only in /docs folder, not in subfolders
cp -r docs/browser/. docs/.

# Avoid 404 not found error
cp docs/browser/index.html docs/404.html
