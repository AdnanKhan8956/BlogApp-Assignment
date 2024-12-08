import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  blogData: any[] = []; 
  error: string | null = null;
  newRecord = { username: '', text: '' }; 
  isModalOpen = false; 

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadBlogData();
  }

  loadBlogData() {
    this.apiService.getData("Blog").subscribe(
      (data) => {
        this.blogData = data; 
      },
      (err) => {
        this.error = 'Error fetching blog data!';
        console.error(err);
      }
    );
  }

  
  openModal() {
    this.isModalOpen = true;
  }

 
  closeModal() {
    this.isModalOpen = false;
    this.newRecord = { username: '', text: '' }; 
  }

  
  addRecord() {
    if (!this.newRecord.username || !this.newRecord.text) {
      alert('Username and text are required!');
      return;
    }

    this.apiService.postData("Blog", this.newRecord).subscribe(
      (data) => {
        this.blogData.push(data); 
        this.closeModal(); 
      },
      (err) => {
        console.error(err);
        alert('Failed to add record.');
      }
    );
  }

  
  editRecord(record: any) {
    const updatedText = prompt('Enter new text:', record.text);
    if (updatedText === null || updatedText === '') return;

    const updatePayload = { ...record, text: updatedText };

    this.apiService.putData(`Blog/${record.id}`, updatePayload).subscribe(
      (data) => {
        record.text = updatedText;
      },
      (err) => {
        console.error(err);
        alert('Failed to update record.');
      }
    );
  }

 
  deleteRecord(recordId: number) {
    if (!confirm('Are you sure you want to delete this record?')) return;

    this.apiService.deleteData(`Blog/${recordId}`).subscribe(
      () => {
        this.blogData = this.blogData.filter((record) => record.id !== recordId); 
      },
      (err) => {
        console.error(err);
        alert('Failed to delete record.');
      }
    );
  }
}
