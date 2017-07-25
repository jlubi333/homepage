all:
	node build.js

live:
	(ag -l | ag -v "docs" | entr make) & (live-server ./build)

deploy:
	node build.js && cd build && git add -A && git commit -m "Deploy" && git push
