all:
	node build.js

live:
	(ag -l | ag -v "docs" | entr make) & (live-server ./homepage-2017)

deploy:
	node build.js && cd homepage-2017 && git add -A && git commit -m "Deploy" && git push
