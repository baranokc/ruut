using System.Diagnostics;
using ruut.application.DTO.Payment;

namespace ruut.application.Interfaces.Services;

public interface IPaymentService
{
    Task<bool> ProcessPaymentAsync(Guid userId, ProcessPaymentRequestDto request, CancellationToken cancellationToken = default);
}