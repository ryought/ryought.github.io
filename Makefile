post:
	echo -e "What is title?\n>"; read TITLE; touch "_posts/`date +%Y-%m-%d`-$TITLE.md"
	# vi "_posts/`date +%Y-%m-%d`-${TITLE}.md"

server:
	bundle exec jekyll serve --draft
