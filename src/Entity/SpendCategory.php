<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\SpendCategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Attribute\Groups;


#[ORM\Entity(repositoryClass: SpendCategoryRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['spendCategory:read'], 'enable_max_depth' => true, 'skip_null_values' => false],
    denormalizationContext: ['groups' => ['spendCategory:write'], 'disable_type_enforcement' => true],
    paginationEnabled: false,
)]
#[UniqueEntity(fields: "categoryCode", message: "類別代碼已經存在!!")]
class SpendCategory
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['spendCategory:read', 'spendCategory:write', 'dailySpend:read'])]
    #[ORM\Column(length: 2, options: ["comment" => "代碼"])]
    private ?string $categoryCode = null;

    #[Groups(['spendCategory:read', 'spendCategory:write', 'dailySpend:read'])]
    #[ORM\Column(length: 10)]
    private ?string $categoryName = null;

    #[ORM\Column(options: ["default" => 0])]
    private ?bool $deleteFlag = null;

    #[ORM\OneToMany(targetEntity: DailySpend::class, mappedBy: "categoryId")]
    private Collection $dailySpends;

    public function __construct()
    {
        $this->dailySpends = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCategoryCode(): ?string
    {
        return $this->categoryCode;
    }

    public function setCategoryCode(string $categoryCode): static
    {
        $this->categoryCode = $categoryCode;

        return $this;
    }

    public function getCategoryName(): ?string
    {
        return $this->categoryName;
    }

    public function setCategoryName(string $categoryName): static
    {
        $this->categoryName = $categoryName;

        return $this;
    }

    public function isDeleteFlag(): ?bool
    {
        return $this->deleteFlag;
    }

    public function setDeleteFlag(bool $deleteFlag): static
    {
        $this->deleteFlag = $deleteFlag;

        return $this;
    }

    /**
     * @return Collection|DailySpend[]
     */
    public function getDailySpends(): Collection
    {
        return $this->dailySpends;
    }

    public function addDailySpend(DailySpend $dailySpend): static
    {
        if (!$this->dailySpends->contains($dailySpend)) {
            $this->dailySpends[] = $dailySpend;
            $dailySpend->setCategoryId($this);
        }

        return $this;
    }

    public function removeDailySpend(DailySpend $dailySpend): static
    {
        if ($this->dailySpends->contains($dailySpend)) {
            $this->dailySpends->removeElement($dailySpend);
            // set the owning side to null (unless already changed)
            if ($dailySpend->getCategoryId() === $this) {
                $dailySpend->setCategoryId(null);
            }
        }

        return $this;
    }
}
