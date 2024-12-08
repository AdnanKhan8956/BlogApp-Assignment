import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface Post {
  id: number;
  username: string;
  dateCreated: Date;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts = new BehaviorSubject<Post[]>([]);
  posts$ = this.posts.asObservable();
  private postId = 1;

  constructor() {}

  getPosts() {
    return this.posts$;
  }

  addPost(username: string, text: string) {
    const newPost: Post = {
      id: this.postId++,
      username,
      dateCreated: new Date(),
      text,
    };
    this.posts.next([...this.posts.value, newPost]);
  }

  deletePost(id: number) {
    this.posts.next(this.posts.value.filter((post) => post.id !== id));
  }

  updatePost(id: number, text: string) {
    const posts = this.posts.value.map((post) =>
      post.id === id ? { ...post, text } : post
    );
    this.posts.next(posts);
  }
}