class GeneralSetting < ApplicationRecord
  belongs_to :account

  enum format_date: {
    dd_mm_yyyy: 0,  # 31/12/2025 (Phổ biến ở Việt Nam, châu Âu)
    mm_dd_yyyy: 1,  # 12/31/2025 (Phổ biến ở Mỹ)
    yyyy_mm_dd: 2,  # 2025-12-31 (ISO 8601, phổ biến cho database)
    full_text: 3     # December 31, 2025 (Dạng chữ đầy đủ)
  }

  enum currency: {
    usd: 0,   # Đô la Mỹ ($)
    eur: 1,   # Euro (€)
    vnd: 2,   # Việt Nam Đồng (₫)
    gbp: 3,   # Bảng Anh (£)
    jpy: 4,   # Yên Nhật (¥)
    krw: 5    # Won Hàn Quốc
  }

  enum default_languages: {
    english: 0,  # Tiếng Anh
    vietnamese: 1, # Tiếng Việt
    japanese: 2  # Tiếng Nhật
  }

  enum default_themes: {
    light: 0,
    dark: 1
  }
end
