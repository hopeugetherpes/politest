package com.politest.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.Map;

/**
 * Livro de referencia de uma personalidade (um por personalidade).
 *
 * @param title English book title
 * @param url direct English affiliate link; blank uses an Amazon search
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public record Book(
        String personalityId,
        Map<String, String> title,
        Integer year,
        Map<String, String> url
) {
}
