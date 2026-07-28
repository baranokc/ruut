using Microsoft.Win32.SafeHandles;
using ruut.domain.Entities;

namespace ruut.application.Interfaces.Security;

public interface IJwtProvider
{
    (string accessToken, DateTime expiresAt) GenerateAccessToken(User user);
    RefreshToken GenerateRefreshToken(Guid userId);
}