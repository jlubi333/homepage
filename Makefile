all:
	node build.js

live:
	(ag -l | ag -v "docs" | entr make) & (live-server ./docs)
