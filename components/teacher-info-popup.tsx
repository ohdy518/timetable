"use client"

import type React from "react"
import { useState, useEffect, useRef, type KeyboardEvent, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Drawer, DrawerContent, DrawerTrigger, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer"
import { cn } from "@/lib/utils"
import { useMediaQuery } from 'react-responsive';


interface TeacherInfoPopupProps {
  subject: string
  onSave: (info: string) => void
  initialInfo?: string
  children: React.ReactNode
}

export function TeacherInfoPopup({ subject, onSave, initialInfo = "", children }: TeacherInfoPopupProps) {
  const [teacherInfo, setTeacherInfo] = useState(initialInfo)
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const isSmallScreen = useMediaQuery({ query: "(max-width: 640px)" })

  useEffect(() => {
    setTeacherInfo(initialInfo)
  }, [initialInfo])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      const input = inputRef.current
      input.focus()
      requestAnimationFrame(() => {
        input.setSelectionRange(input.value.length, input.value.length)
      })
    }
  }, [isOpen])

  const handleSave = () => {
    if (teacherInfo.length > 4) {
      setError("선생님 이름은 4자를 초과할 수 없습니다")
      return
    }
    onSave(teacherInfo)
    setIsOpen(false)
    setError("")
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTeacherInfo(value)
    if (value.length > 4) {
      setError("선생님 이름은 4자를 초과할 수 없습니다")
    } else {
      setError("")
    }
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
  }

  const TeacherInfoForm = (
    <div className="grid gap-2">
      <Label htmlFor="teacher" className="dark:text-neutral-200">선생님 이름</Label>
      <Input
        ref={inputRef}
        id="teacher"
        value={teacherInfo}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        maxLength={10}
        className={cn(
          "h-8 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder-neutral-400",
          error && "border-red-500 dark:border-red-500"
        )}
      />
      {error && (
        <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  )

  const content = (
    <>
      <div className="space-y-2">
        <h4 className="font-medium leading-none dark:text-neutral-100">선생님 정보 수정</h4>
        <p className="text-sm text-muted-foreground dark:text-neutral-400">
          {subject} 선생님의 정보를 입력하세요. 브라우저에 자동으로 저장됩니다.
        </p>
      </div>
      {TeacherInfoForm}
    </>
  )

  if (isSmallScreen) {
    return (
      <Drawer open={isOpen} onOpenChange={handleOpenChange}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent className="h-[40%]">
          <DrawerHeader>
            <DrawerTitle>선생님 정보 수정</DrawerTitle>
            <DrawerDescription>
              {subject} 선생님의 정보를 입력하세요. 브라우저에 자동으로 저장됩니다.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-4">
            {TeacherInfoForm}
            <div className="mt-4">
              <Button onClick={handleSave} disabled={teacherInfo.length > 4} className="w-full">
                저장
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent 
        className={cn(
          "w-80 dark:bg-neutral-900 dark:border-neutral-800",
          "data-[state=open]:animate-slideUpAndFade data-[state=open]:duration-300",
          "data-[state=closed]:animate-fadeOut data-[state=closed]:duration-200"
        )}
        sideOffset={5}
      >
        <div className="grid gap-4">
          {content}
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={teacherInfo.length > 4}>
              저장
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
