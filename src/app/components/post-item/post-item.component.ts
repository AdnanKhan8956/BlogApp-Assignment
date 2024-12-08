import { Component, Input, Output, EventEmitter } from '@angular/core';

interface Post {
  id: number;
  username: string;
  dateCreated: Date;
  text: string;
}

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent {
  @Input() post!: Post;
  @Output() edit = new EventEmitter<Post>();
  @Output() delete = new EventEmitter<number>();
}
