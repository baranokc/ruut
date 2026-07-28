using FluentValidation;
using ruut.application.DTO.Auth;

namespace ruut.application.Validators;

public class LoginRequestValidator : AbstractValidator<LoginRequestDto>
{
    public LoginRequestValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required to Log In.")
            .EmailAddress().WithMessage("A valid email adress is required.");
        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is required to Log In.");
    }
}