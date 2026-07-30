namespace ruut.application.DTO.Payment;

public record ProcessPaymentRequestDto(
    Guid BookingId,
    string CardHolderName,
    string CardNumber,
    string ExpiryMonth,
    string ExpiryYear,
    string Cvv
);