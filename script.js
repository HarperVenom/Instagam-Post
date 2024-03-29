import { faker } from 'https://esm.sh/@faker-js/faker';

const post = createPost();
const comments = createCommentsArray(5,15);
comments.forEach(comment => {
    comment.addReplies(0, 3);
})

function createPost() {
    return {
        author: createPerson(),

        location: faker.location.country(),
        content: faker.image.url({ width: 640, height: Math.round(4 + Math.random() * 3)*120}),
        description: faker.lorem.sentences({ min: 1, max: 3 })
    }
}

function createComment() {
    return {
        author: createPerson(),
        message: faker.lorem.sentences({ min: 1, max: 2 }),
        addReplies: function(min, max) {
            this.replies = createCommentsArray(min, max);
        }
    }
}

function createPerson() {
    return {
        username: faker.internet.userName().toLowerCase(),
        profileImage: faker.image.avatar(),
    }
}

const postAuthorImage = document.querySelector('.post-author-image'); 
const postAuthorUsername = document.querySelector('.post-author-name');

const postLocation = document.querySelector('.post-author-location');
const postContent = document.querySelector('.post-content');

const postDescriptionUsername = document.getElementById('postDescriptionUsername');
const postDescription = document.getElementById('postDescription');

const postComments = document.querySelector('.post-comments');
const postCommentContainer = document.querySelector('.post-comments-container');
const backgroundCover = document.querySelector('.cover');

const postCommentsSection = document.querySelector('.comments-section');

setUpPost();

//Open comments section
postComments.addEventListener('click', () => {
    loadComments();
    postCommentContainer.classList.remove('hidden');
    backgroundCover.classList.remove('hidden');
    
    postCommentsSection.scrollTop = 0;
});
//Close comments section
backgroundCover.addEventListener('click', () => {
    postCommentContainer.classList.add('hidden');
    backgroundCover.classList.add('hidden');
})

function setUpPost(){
    postAuthorImage.setAttribute('src',post.author.profileImage);
    postAuthorUsername.innerHTML = post.author.username;

    postLocation.innerHTML = post.location;
    postContent.setAttribute('src', post.content);

    postDescriptionUsername.innerHTML = post.author.username;
    postDescription.innerText = post.description;

    document.getElementById('allComments').innerHTML = comments.length;

    document.body.style.display = 'block';
}

function loadComments() {
    postCommentsSection.innerHTML = '';
    comments.forEach(comment => {
        setUpComment(comment, postCommentsSection);
    })
}

function createCommentsArray(min, max) {
    const comments = [];
    const commentsNumber = Math.round(min+Math.random()*(max-min));
    for (let i = 0; i < commentsNumber; i++) {
        comments.push(createComment());
    }
    return comments;
}

function setUpComment(comment, parent) {
    const commentBlock = document.createElement('div');
    const repliesBlock = document.createElement('div');

    const commentElement = document.createElement('div');
    const commentImg = document.createElement('img');
    const commentName = document.createElement('div');
    const commentMessage = document.createElement('div');
    const commentLike = document.createElement('div');
    const commentReply = document.createElement('div');

    repliesBlock.classList.add('comment-replies-block');

    commentElement.classList.add('comment');

    commentImg.classList.add('comment-author-image', 'avatar', 'circ', 'pad-sm');
    commentImg.setAttribute('src', comment.author.profileImage);

    commentName.classList.add('comment-author-name', 'bold', 'no-wrap', 'f-tiny');
    commentName.innerText = comment.author.username;

    commentMessage.classList.add('comment-message');
    commentMessage.innerText = comment.message;

    commentLike.classList.add('comment-like', 'side-x-mar-sm', 'point');
    commentLike.innerHTML = `<svg aria-label="Like" class="x1lliihq x1n2onr6 xyb1xck" fill="gray" height="24" role="img" viewBox="0 0 24 24" width="20"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>`;
    
    commentReply.classList.add('comment-reply-button', 'gray-text', 'bold', 'f-tiny');
    commentReply.innerText = 'Reply';

    commentElement.append(commentImg, commentName, commentMessage, commentLike, commentReply);
    commentBlock.appendChild(commentElement);

    if (comment.replies && comment.replies.length > 0) {
        const commentReplies = document.createElement('div');
        const repliesLine = document.createElement('div');
        const repliesText = document.createElement('div');
        repliesLine.classList.add('comment-replies-button-line');
        repliesText.classList.add('bold', 'gray-text', 'f-tiny');
        repliesText.innerHTML = getRepliesButtonName(comment.replies.length);
        commentReplies.classList.add('comment-replies-button', 'point');
        commentReplies.append(repliesLine, repliesText);

        commentReplies.addEventListener('click', () => {
            if (!comment.repliesLoaded) {
                loadReplies(comment, repliesBlock);
                repliesText.innerHTML = getRepliesButtonName();
            } else {
                repliesBlock.classList.toggle('hidden');
                repliesText.innerHTML = getRepliesButtonName(comment.replies.length);
            }
        });
        commentBlock.append(repliesBlock, commentReplies);
    }

    parent.appendChild(commentBlock);
    
    return commentElement;
}

function getRepliesButtonName(length) {
    switch (length) {
        case undefined: {return `Hide replies`;} 
        case 1: {return `View 1 more reply`;} 
        default: {return `View ${length} more replies`;} 
    }
}

function loadReplies(comment, commentBlock) {
    comment.replies.forEach((reply) => {
        const replyElement = setUpComment(reply, commentBlock);
        replyElement.classList.add('comment-reply');
    });
    comment.repliesLoaded = true;
}