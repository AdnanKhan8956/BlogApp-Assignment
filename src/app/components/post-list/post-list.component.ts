import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../services/post.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  posts: Post[] = [];
  showingForm: boolean = false;

  constructor(private postService: PostService) {
    
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  showForm() {
    this.showingForm = !this.showingForm;
  }

  addNewPost(post: { username: string; text: string }) {
    this.postService.addPost(post.username, post.text);
    this.showForm();
  }

  editPost(post: Post) {
  }

  deletePost(id: number) {
    this.postService.deletePost(id);
  }
}
