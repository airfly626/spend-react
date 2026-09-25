<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\DailySpendRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Serializer\Annotation\SerializedName;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints as Assert;


#[ORM\Entity(repositoryClass: DailySpendRepository::class)]
#[ApiResource(
    routePrefix: '/v1/x9f2w7ta8',
    shortName: 'b3y1s',
    normalizationContext: ['groups' => ['dailySpend:read'], 'enable_max_depth' => true, 'skip_null_values' => false],
    denormalizationContext: ['groups' => ['dailySpend:write'], 'disable_type_enforcement' => true],
    order: ['spendDate' => 'DESC', 'categoryId'],
    paginationEnabled: false,
)]
#[Gedmo\SoftDeleteable(fieldName: 'deletedAt', timeAware: false, hardDelete: true)]
#[ApiFilter(
    SearchFilter::class,
    properties: [
        'spendDate' => 'exact'
    ]
)]
class DailySpend
{
    #[Groups(['dailySpend:read'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['dailySpend:read', 'dailySpend:write', 'dailySpend:item:get'])]
    #[Assert\NotBlank(message: "不可空白")]
    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTime $spendDate = null;

    #[ORM\ManyToOne(targetEntity: SpendCategory::class, inversedBy: "dailySpends")]
    #[ORM\JoinColumn(nullable: false, name: 'category_id', referencedColumnName: 'id')]
    #[Groups(['dailySpend:read', 'dailySpend:write', 'dailySpend:item:get'])]
    #[Assert\NotBlank(message: "不可空白")]
    private ?SpendCategory $categoryId = null;

    #[Groups(['dailySpend:read', 'dailySpend:write', 'dailySpend:item:get'])]
    #[Assert\NotBlank(message: "不可空白")]
    #[Assert\Regex('/^\d+$/', message: "需為正整數")]
    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    private ?string $amount = null;

    #[Groups(['dailySpend:read', 'dailySpend:write', 'dailySpend:item:get'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;

    #[Groups(['dailySpend:read', 'dailySpend:write', 'dailySpend:item:get'])]
    #[Assert\NotBlank(message: "不可空白")]
    #[Assert\Choice(choices: ['1', '2', '3', '4', '5'], message: 'Choose a valid genre.')]
    #[ORM\Column(length: 10, nullable: true, options: ["comment" => "心情"])]
    private ?string $mood = null;

    #[Groups(['dailySpend:read'])]
    #[ORM\Column(options: ["default" => 0])]
    private ?int $moodScore = 0;

    #[Gedmo\Timestampable(on: 'create')]
    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[Gedmo\Timestampable(on: 'update')]
    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $deletedAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    #[Groups(['dailySpend:read'])]
    #[SerializedName('spendDateRoc')]
    public function getSpendDateRoc(): ?string
    {
        if (!$this->spendDate) {
            return null;
        }

        $year = (int) $this->spendDate->format('Y') - 1911;
        $md = $this->spendDate->format('m-d');

        return sprintf('%03d-%s', $year, $md);
    }

    public function getSpendDate(): ?\DateTime
    {
        return $this->spendDate;
    }

    public function setSpendDate(\DateTime $spendDate): static
    {
        $this->spendDate = $spendDate;

        return $this;
    }

    public function getCategoryId(): ?SpendCategory
    {
        return $this->categoryId;
    }

    public function setCategoryId(SpendCategory $categoryId): static
    {
        $this->categoryId = $categoryId;

        return $this;
    }

    public function getAmount(): ?string
    {
        return $this->amount;
    }

    public function setAmount(string $amount): static
    {
        $this->amount = $amount;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getMood(): ?string
    {
        return $this->mood;
    }

    public function setMood(?string $mood): static
    {
        $this->mood = $mood;

        return $this;
    }

    public function getMoodScore(): ?int
    {
        return $this->moodScore;
    }

    public function setMoodScore(int $moodScore): static
    {
        $this->moodScore = $moodScore;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getDeletedAt(): ?\DateTimeImmutable
    {
        return $this->deletedAt;
    }

    public function setDeletedAt(?\DateTimeImmutable $deletedAt): static
    {
        $this->deletedAt = $deletedAt;

        return $this;
    }
}
