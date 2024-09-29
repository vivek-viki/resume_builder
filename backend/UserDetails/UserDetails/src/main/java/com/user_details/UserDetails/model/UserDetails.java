package com.user_details.UserDetails.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "t_userdetails")
public class UserDetails {
    @Id
    private long userId;
    private String name;
    private String designation;
    private long number;
    private String mailId;
    private String address;
    private String links;
}
