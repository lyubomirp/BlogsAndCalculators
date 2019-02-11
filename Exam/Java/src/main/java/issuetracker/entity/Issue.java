package issuetracker.entity;

import javax.persistence.*;

@Entity
@Table(name = "issues")
public class Issue {

    public Integer Id;
    public String Title;
    public String Content;
    public Integer Priority;

    public Issue(String title, String content, Integer priority){
        this.Title = title;
        this.Content = content;
        this.Priority = priority;
    }

    public Issue(){ }


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    @Column(nullable = false)
    public String getTitle() {
        return Title;
    }

    public void setTitle(String title) {
        Title = title;
    }


    @Column(nullable = false)
    public String getContent() {
        return Content;
    }

    public void setContent(String content) {
        Content = content;
    }


    @Column(nullable = false)
    public Integer getPriority() {
        return Priority;
    }

    public void setPriority(Integer priority) {
        Priority = priority;
    }
}
