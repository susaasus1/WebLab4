package org.examplenew.request;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

@Data
@ToString
public class RegisterRequest implements Serializable {
    private String userName;
    private String userPassword;
    private String userRole;
}
