package com.AquaLifeLine.Backend.Login;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class AuthRequest {
    private String name;
    private String password;
}
