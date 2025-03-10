using System;
using System.Text.RegularExpressions;

namespace fopfin.Domain.ValueObjects
{
    public class Email
    {
        public string Value { get; }

        private static readonly Regex EmailRegex = new Regex(
            @"^[^@\s]+@[^@\s]+\.[^@\s]+$", RegexOptions.Compiled | RegexOptions.IgnoreCase);

        public Email(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                throw new ArgumentException("Email cannot be empty.");

            if (!EmailRegex.IsMatch(email))
                throw new ArgumentException("Invalid email format.");

            Value = email;
        }

        public override string ToString() => Value;
    }
}
