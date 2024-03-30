import { faker } from 'https://esm.sh/@faker-js/faker';

const post = createPost();
const likes = createLikesArray(10,50);
const comments = createCommentsArray(5,15);
comments.forEach(comment => {
    comment.addReplies(0, 3);
})

function createPost() {
    return {
        author: createPerson(),

        location: faker.location.country(),
        content: faker.image.url({ width: 640, height: Math.round(4 + Math.random() * 2)*120}),
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
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName()
    }
}

const postAuthorImage = document.querySelector('.post-author-image'); 
const postAuthorUsername = document.querySelector('.post-author-name');

const postLocation = document.querySelector('.post-author-location');
const postContent = document.querySelector('.post-content');

const likeButton = document.getElementById('likeButton');
const saveButton = document.getElementById('saveButton');

const postDescriptionUsername = document.getElementById('postDescriptionUsername');
const postDescription = document.getElementById('postDescription');

const postLikesButton = document.querySelector('.post-liked-by');
const postCommentsButton = document.querySelector('.post-comments');

const postWrapper = document.querySelector('.post-wrapper');
const postLikesContainer = document.querySelector('.post-likes-container');
const postLikesSection = document.querySelector('.post-likes-section');
const postLikesBackButton = document.querySelector('.post-likes-back-button');

const backgroundCover = document.querySelector('.cover');
const postCommentContainer = document.querySelector('.post-comments-container');
const postCommentsSection = document.querySelector('.comments-section');

setUpPost();

likeButton.addEventListener('click', (e) => {
    const button = e.target;
    hitLike(button);
})

saveButton.addEventListener('click', (e) => {
    const button = e.target;
    if (button.classList.contains('pressed')) return;
    button.classList.toggle('black')
    button.classList.add('pressed');
    setTimeout(() => {button.classList.remove('pressed')},500);
})

function hitLike(button) {
    if (button.classList.contains('pressed')) return;
    button.classList.toggle('red')
    button.classList.add('pressed');
    setTimeout(() => {button.classList.remove('pressed')},500);
}

//Open likes section
postLikesButton.addEventListener('click', () => {
    loadLikes();
    postLikesContainer.classList.remove('hidden');
    postWrapper.classList.add('shifted');

    postLikesSection.scrollTop = 0;
})
//Close likes section
postLikesBackButton.addEventListener('click', () => {
    postLikesContainer.classList.add('hidden');
    postWrapper.classList.remove('shifted');
})

//Open comments section
postCommentsButton.addEventListener('click', () => {
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

    document.getElementById('firstLike').innerHTML = likes[0].username;
    document.getElementById('allLikes').innerHTML = likes.length-1;
    document.getElementById('allComments').innerHTML = comments.length;

    document.body.style.display = 'block';
}

function createLikesArray(min, max) {
    const likes = [];
    const likesNumber = Math.round(min+Math.random()*(max-min));
    for (let i = 0; i < likesNumber; i++) {
        likes.push(createPerson());
    }
    return likes;
}

function loadLikes() {
    if (postLikesSection.innerHTML.trim() != '') {
        return;
    }
        likes.forEach(like => {
        setUpLike(like, postLikesSection);
    })
    document.querySelector('.post-likes-number').innerText = likes.length;
}

function setUpLike(like, parent) {
    const likeElement = document.createElement('div');
    const likeImg = document.createElement('img');
    const likeUserName = document.createElement('div');
    const likeName = document.createElement('div');
    const followButton = document.createElement('button');

    likeElement.classList.add('post-like', 'side-y-mar-mid');
    likeImg.classList.add('avatar', 'circ', 'size-50');
    likeImg.setAttribute('src', like.profileImage);
    likeUserName.classList.add('username', 'bold', 'f-sm', 'no-wrap');
    likeUserName.innerText = shortenName(like.username);
    likeName.classList.add('name', 'gray-text', 'f-sm', 'no-wrap');
    likeName.innerText = shortenName(like.firstname + ' ' + like.lastname);
    followButton.classList.add('follow-button', 'f-sm', 'bold', 'point');
    followButton.innerText = 'Follow';

    likeElement.append(likeImg, likeUserName, likeName, followButton);
    parent.appendChild(likeElement);

    return likeElement;
}
function shortenName(name) {
    if (name.length > 18) {
        return name.slice(0,18) + '...';
    }
    return name;
}

function createCommentsArray(min, max) {
    const comments = [];
    const commentsNumber = Math.round(min+Math.random()*(max-min));
    for (let i = 0; i < commentsNumber; i++) {
        comments.push(createComment());
    }
    return comments;
}

function loadComments() {
    postCommentsSection.innerHTML = '';
    comments.forEach(comment => {
        setUpComment(comment, postCommentsSection);
    })
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
    commentLike.innerHTML = `<svg aria-label="Like" height="22" role="img" viewBox="0 0 48 48" width="18"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg></div>`;
    commentLike.addEventListener('click',(e) => {hitLike(e.target)});
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