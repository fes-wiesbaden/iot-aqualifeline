package com.AquaLifeLine.Backend.Login;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthResponse {
    @SuppressWarnings("FieldMayBeFinal")
    private String token;
}
